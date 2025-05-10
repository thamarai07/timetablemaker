"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];
const courses = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Computer Science",
];

const initialForm = {
  day: days[0],
  timeSlot: timeSlots[0],
  course: courses[0],
  teacher: "",
  room: "",
};

export default function TimetableMaker() {
  const [userRole, setUserRole] = useState("student");
  const [timetable, setTimetable] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [useClientTimeSlot, setUseClientTimeSlot] = useState(false);
  const tableRef = useRef(null);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addOrUpdateEntry = (e) => {
    e.preventDefault();
    const updated = { ...formData };

    if (editingId) {
      setTimetable((prev) =>
        prev.map((entry) =>
          entry.id === editingId ? { ...updated, id: editingId } : entry
        )
      );
    } else {
      setTimetable((prev) => [
        ...prev,
        { ...updated, id: Date.now().toString() },
      ]);
    }

    setFormData(initialForm);
    setEditingId(null);
    setUseClientTimeSlot(false);
  };

  const editEntry = (entry) => {
    setFormData(entry);
    setEditingId(entry.id);
    setUseClientTimeSlot(!timeSlots.includes(entry.timeSlot));
  };

  const deleteEntry = (id) => {
    setTimetable((prev) => prev.filter((entry) => entry.id !== id));
  };

  const filteredTimetable =
    userRole === "teacher"
      ? timetable.filter((entry) => entry.teacher === "Prof. Smith")
      : timetable;

  const cleanUnsupportedColors = () => {
    document.querySelectorAll("*").forEach((el) => {
      const style = getComputedStyle(el);
      if (style.color.includes("oklch")) el.style.color = "#000";
      if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
    });
  };

  const exportToPDF = async () => {
    cleanUnsupportedColors();
    const input = tableRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("timetable.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Timetable Maker
        </h1>

        {/* Role Toggle */}
        <div className="mb-6 flex justify-center space-x-4">
          {["student", "teacher"].map((role) => (
            <button
              key={role}
              onClick={() => setUserRole(role)}
              className={`px-4 py-2 rounded ${
                userRole === role
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)} View
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Entry" : "Add Timetable Entry"}
          </h2>
          <form onSubmit={addOrUpdateEntry} className="space-y-4">
            <SelectField
              name="day"
              value={formData.day}
              options={days}
              onChange={handleInputChange}
            />
            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={useClientTimeSlot}
                  onChange={(e) => setUseClientTimeSlot(e.target.checked)}
                />
                <span>Use your own time slot</span>
              </label>
              {useClientTimeSlot ? (
                <TextInput
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  placeholder="e.g., 5:00 PM - 6:00 PM"
                />
              ) : (
                <SelectField
                  name="timeSlot"
                  value={formData.timeSlot}
                  options={timeSlots}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <SelectField
              name="course"
              value={formData.course}
              options={courses}
              onChange={handleInputChange}
            />
            <TextInput
              name="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              placeholder="e.g., Prof. Smith"
            />
            <TextInput
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              placeholder="e.g., Room 101"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              {editingId ? "Update Entry" : "Add Entry"}
            </button>
          </form>
        </div>

        {/* Timetable Display */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Timetable</h2>
            <button
              onClick={exportToPDF}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Export as PDF
            </button>
          </div>
          {filteredTimetable.length === 0 ? (
            <p className="text-gray-600">No timetable entries yet.</p>
          ) : (
            <div className="overflow-x-auto" ref={tableRef}>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    {["Day", "Time Slot", "Course", "Teacher", "Room", "Actions"].map((h) => (
                      <th key={h} className="p-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredTimetable.map((entry) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="border-b"
                      >
                        <td className="p-3">{entry.day}</td>
                        <td className="p-3">{entry.timeSlot}</td>
                        <td className="p-3">{entry.course}</td>
                        <td className="p-3">{entry.teacher}</td>
                        <td className="p-3">{entry.room}</td>
                        <td className="p-3">
                          <button
                            onClick={() => editEntry(entry)}
                            className="text-blue-500 hover:text-blue-700 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Field Components
const SelectField = ({ name, value, options, onChange }) => (
  <div>
    <label className="block text-gray-700 capitalize">{name}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextInput = ({ name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-gray-700 capitalize">{name}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);
