import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ngo_platform.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Directory for uploaded files
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Maximum file size: 16MB

# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)

# Models
class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    volunteer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    expertise = db.Column(db.String, nullable=True)
    availability = db.Column(db.String, nullable=True)
    currently_working = db.Column(db.Boolean, default=False)
    location = db.Column(db.String(100), nullable=False)
    field_of_interest = db.Column(db.String(100), nullable=True)
    past_experience = db.Column(db.Text, nullable=True)
    certifications = db.Column(db.String, nullable=True)
    verification_status = db.Column(db.Enum('Pending', 'Approved', 'Rejected', name='verification_status_enum'), default='Pending')
    projects_working = db.Column(db.String, nullable=True)
    proposals_sent = db.Column(db.String, nullable=True)
    activity_status = db.Column(db.Enum('Active', 'Inactive', name='activity_status_enum'), default='Inactive')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

class NGO(db.Model):
    __tablename__ = 'ngo'
    ngo_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    sector = db.Column(db.String, nullable=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    verification_documents = db.Column(db.String, nullable=True)
    activity_report = db.Column(db.String, nullable=True)
    verification_status = db.Column(db.Enum('Pending', 'Approved', 'Rejected', name='ngo_verification_status_enum'), default='Pending')
    operational_status = db.Column(db.Enum('Active', 'Inactive', name='ngo_operational_status_enum'), default='Active')
    projects_posted = db.Column(db.String, nullable=True)
    number_volunteers_taken = db.Column(db.Integer, default=0)
    review = db.Column(db.String, nullable=True)
    un_ecosoc = db.Column(db.Enum('YES', 'NO', name='un_ecosoc_enum'), default='NO')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

class Project(db.Model):
    __tablename__ = 'project'
    project_id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo.ngo_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    project_type = db.Column(db.Enum('Health', 'Education', 'Environment', 'Other', name='project_type_enum'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.String, nullable=True)
    commitment_type = db.Column(db.Enum('Remote', 'Physical', 'Both', name='commitment_type_enum'), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    safe_for_women = db.Column(db.Boolean, default=False)
    progress_parameters = db.Column(db.String, nullable=True)
    progress_updates = db.Column(db.String, nullable=True)
    volunteer_accepted = db.Column(db.String, nullable=True)
    volunteer_requests = db.Column(db.String, nullable=True)
    funding_requirements = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    if request.method == 'POST':
        volunteer = Volunteer(
            name=request.form['name'],
            email=request.form['email'],
            phone=request.form['phone'],
            expertise=request.form.get('expertise'),
            availability=request.form.get('availability'),
            currently_working=bool(request.form.get('working_in_organisation')),
            location=request.form['location'],
            field_of_interest=request.form['field_of_interest'],
            past_experience=request.form['past_experience'],
            certifications=request.form.get('certifications'),
        )
        db.session.add(volunteer)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('volunteer_form.html')

@app.route('/ngo', methods=['GET', 'POST'])
def ngo():
    if request.method == 'POST':
        unique_id = request.form.get('unique_id')
        verification_file = request.files['verification_documents']
        activity_report = request.files['activity_report']

        # Ensure filenames are based on unique_id
        verification_filename = f"{unique_id}_verification_document.pdf" if verification_file else None
        activity_filename = f"{unique_id}_activity_report.pdf" if activity_report else None

        # Save the files to the upload folder
        if verification_file:
            verification_filepath = os.path.join(app.config['UPLOAD_FOLDER'], verification_filename)
            verification_file.save(verification_filepath)

        if activity_report:
            activity_filepath = os.path.join(app.config['UPLOAD_FOLDER'], activity_filename)
            activity_report.save(activity_filepath)

        # Create NGO instance and save to the database
        ngo = NGO(
            name=request.form['name'],
            email=request.form['email'],
            phone=request.form['phone'],
            country=request.form['country'],
            state=request.form['state'],
            city=request.form['city'],
            address=request.form['address'],
            sector=request.form.get('sector'),
            unique_id=unique_id,
            verification_documents=verification_filename,
            activity_report=activity_filename,
            un_ecosoc=request.form.get('un_ecosoc'),
        )
        db.session.add(ngo)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('ngo_form.html')


@app.route('/project', methods=['GET', 'POST'])
def project():
    if request.method == 'POST':
        project = Project(
            ngo_id=request.form['ngo_id'],
            title=request.form['title'],
            project_type=request.form['project_type'],
            description=request.form['description'],
            required_skills=request.form.get('required_skills'),
            commitment_type=request.form['commitment_type'],
            country=request.form['country'],
            state=request.form['state'],
            city=request.form['city'],
            safe_for_women=bool(request.form.get('safe_for_women')),
            funding_requirements=request.form.get('funding_requirements'),
        )
        db.session.add(project)
        db.session.commit()
        return redirect(url_for('index'))
    ngos = NGO.query.all()
    return render_template('project_form.html', ngos=ngos)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    with app.app_context():  # Ensure application context is active
        db.create_all()  # Create all tables
    app.run(debug=True)
