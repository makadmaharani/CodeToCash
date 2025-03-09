const express = require('express');
const cors = require('cors'); // Allows frontend to call backend

const app = express();
app.use(express.json());
app.use(cors());

// Hardcoded CPT codes
const cptCodes = {
    "00100": "Anesthesia for Procedures on the Head",
    "00300": "Anesthesia for Procedures on the Neck",
    "00400": "Anesthesia for Procedures on the Thorax",
    "00500": "Anesthesia for Intrathoracic Procedures",
    "00600": "Anesthesia for Procedures on the Spine and Spinal Cord", 
    "00700": "Anesthesia for Procedures on the Upper Abdomen",
    "00800": "Anesthesia for Procedures on the Lower Abdomen", 
    "00902": "Anesthesia for Procedures on the Perimeum",
    "01200": "Anesthesia for Procedures on the Upper Leg",
    "01112:": "Anesthesia for Procedures on the Pelvis", 
    "70010,": "Diagnostic Radiology Procedures",
    "76506" : "Diagnostic Ultrasound Procedures ",
    "77001" : "Radiologic Guidance",
    "77046" : "Mammography",
    "77071" : "Bone/Joint Studies",
    "77261" : "Radiation Oncology Treatment", 
    "78012": "Nuclear Medicine Procedure",
    "80143": "Therapeutic Drug Assays",
    "80305": "Drug Assay Procedures",
    "80400": "Evocative/Suppression Testing Procedures",
    "80503": "Clinical Pathology Consultations",
    "81000": "Urinalysis Procedures",
    "81105": "Molecular Pathology Procedures",
    "81410": "Genomic Sequencing Procedures",
    "81490": "Multianalyte Assays with Algorithmic Analyses",
    "82009": "Chemistry Procedures",
    "90281": "Immune Globulins",
    "90460": "Immunization Administration for Vaccines/Toxoids",
    "90624": "Vaccines, Toxoids",
    "90785": "Psychiatry Services and Procedures",
    "90901": "Biofeedback Services and Procedures",
    "90935": "Dialysis Services and Procedures",
    "91010": "Gastroenterology Procedures",
    "92002": "Ophthalmology Services and Procedures",
    "92502": "Special Otorhinolaryngologic Services and Procedures",
    "92920": "Cardiovascular Procedures",
    "98000": "Telemedicine Evaluation and Management Services",
    "99221": "Hospital Inpatient and Observation Care Services",
    "99242": "Consultations",
    "99281": "Emergency Department Services",
    "99291": "Critical Care Services",
    "99304": "Nursing Facility Services",
    "99341": "Home or Residence Services",
    "99358": "Prolonged Services",
    "99366": "Case Management Services",
    "0001F": "Composite Measures",
    "0500F": "Patient Management",
    "1000F": "Patient History",
    "2000F": "Physical Examination",
    "3006F": "Diagnostic/Screening Proccesses or Results",
    "4000F": "Therapeutic, Preventive, or Other Interventions",
};

// API to check CPT code
app.post("/verifyCPT", (req, res) => {
    const { submittedCPT, treatment } = req.body;

    if (!submittedCPT || !treatment) {
        return res.json({ message: "Please enter both CPT code and treatment." });
    }

    if (cptCodes[submittedCPT] === treatment) {
        return res.json({ message: "The CPT code is accurate, the billing was done right." });
    } else {
        // Find correct CPT code
        const correctCode = Object.keys(cptCodes).find(code => cptCodes[code] === treatment);
        return res.json({
            message: "CPT code is incorrect.",
            correctCode: correctCode || "Not Found"
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
