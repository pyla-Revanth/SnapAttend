import React from 'react'

const FaceRegister = ({ showRegistration, studentName, setStudentName }) => {
  return (
    <div>
        {showRegistration && (
            <div className="w-full max-w-2xl mt-8 rounded-2xl border border-black/10 bg-white p-6">

                <h3 className="text-xl text-black font-['Climate_Crisis']">
                    Register New Profile
                </h3>

                <p className="mt-2 text-gray-600">
                    Face not recognized. Create a new student profile.
                </p>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-black">
                        Enter your name
                    </label>

                    <input
                        type="text"
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                        placeholder="E.g. Hamza Rizvi"
                        className="
                            mt-2
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            focus:border-black
                        "
                    />
                </div>

            </div>
        )}
    </div>
  )
}

export default FaceRegister