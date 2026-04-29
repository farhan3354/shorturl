import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      enum: [
        "General Practitioner",
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Psychiatrist",
        "Pediatrician",
        "Oncologist",
        "Orthopedic Surgeon",
        "Radiologist",
        "Ophthalmologist",
        "Gynecologist",
        "Urologist",
        "Endocrinologist",
        "ENT Specialist",
        "Anesthesiologist",
      ],
    },
    subspecilized: { type: String, required: true },
    certificate: { type: String, required: true },
    insitiute: { type: String, required: true },
    yearcertifi: { type: String, required: true },
    attachment: { type: String, required: true },
    experienceinstitute: { type: String, required: true },
    experiencefrom: { type: String, required: true },
    experienceto: { type: String, required: true },
    experienceattachment: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    lience: { type: String, required: true },
  },
  { timestamps: true }
);

const Doctor = new mongoose.model("DoctorProfile", doctorSchema);
export default Doctor;
