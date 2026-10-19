import React from "react";
import "./contactus.css";


const contactus = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-red-100">
      {}
      <div className="w-full flex justify-center py-5">
        <img
          src="./ddd.jpg"
          alt="Polytechnic Education"
          className="w-3/4 max-w-2xl rounded-lg shadow-lg"
        />
      </div>

      {}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-center text-lg font-semibold mb-4">Student Information</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="الاسم بالكامل *" className="p-2 border rounded-md" />
          <input type="email" placeholder="Email *" className="p-2 border rounded-md" />
          <input type="text" placeholder="رقم الهاتف المحمول *" className="p-2 border rounded-md" />
          <input type="text" placeholder="Additional phone number" className="p-2 border rounded-md" />
          <select className="p-2 border rounded-md">
            <option>* Select the type of certificate</option>
          </select>
          <input type="text" placeholder="Name of degree and specialization" className="p-2 border rounded-md" />
          <input type="text" placeholder="تخصص *" className="p-2 border rounded-md" />
          <select className="p-2 border rounded-md">
            <option>?Do you want to book an interview</option>
          </select>
          <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">the next</button>
        </form>
      </div>
    </div>
  );
};

const LocationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-red-100 p-5">
      {}
      <div className="text-center text-red-500 text-lg font-bold">
        <p>info@sut.edu.eg 📧</p>
        <p className="text-xl text-black">15755 📞</p>
        <p className="text-gray-700">For international calls</p>
        <p className="text-gray-700">(+2) 010 70 919 636 – (+2) 010 70 919 637</p>
      </div>

      {}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        {}
        <div className="w-3/4 md:w-1/3 border-2 border-red-500 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/mnt/data/Screenshot 2025-03-08 170725.png"
            alt="Map Location"
            className="w-full"
          />
        </div>
        {}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">the site</h2>
          <p className="text-red-500">طريق القاهرة الإسماعيلية الصحراوي</p>
          <p className="text-gray-700">Cairo - Road 51 Ismailia</p>
          <h3 className="text-lg font-semibold text-gray-800 mt-2">مكتب القبول</h3>
          <p className="text-red-500">طريق القاهرة الإسماعيلية الصحراوي</p>
        </div>
      </div>

      {}
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        <div className="border-2 border-red-500 p-4 rounded-2xl text-center">
          <p className="text-gray-800 font-semibold">Who we are</p>
        </div>
        <div className="border-2 border-red-500 p-4 rounded-2xl text-center">
          <p className="text-gray-800 font-semibold">Question Bank for SUT</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <FormPage />
      <LocationPage />
    </div>
  );
};

export default App;