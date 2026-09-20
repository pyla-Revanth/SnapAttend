import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

import Button from "../Button";

function ShareSubject({ subject, onClose }) {
    const joinUrl = `${window.location.origin}/?join-code=${subject.subject_code}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(joinUrl);

            toast.success("Join link copied!");
        } catch (error) {
            console.error("Failed to copy link:", error);

            toast.error("Failed to copy link.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-['Climate_Crisis']">
                        🔗 Share Subject
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-6 text-center">

                    <h3 className="text-xl font-semibold">
                        {subject.name}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {subject.subject_code} • Section{" "}
                        {subject.section}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <QRCodeCanvas
                            value={joinUrl}
                            size={180}
                            level="H"
                        />
                    </div>

                    <div className="mt-6 rounded-xl bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Subject Code
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                            {subject.subject_code}
                        </p>
                    </div>

                    <div className="mt-4 rounded-xl bg-gray-50 p-4 text-left">
                        <p className="text-sm text-gray-500">
                            Join Link
                        </p>

                        <p className="mt-2 break-all text-sm">
                            {joinUrl}
                        </p>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            text="Copy Link"
                            variant="primary"
                            onClick={handleCopy}
                        />

                        <Button
                            text="Close"
                            variant="secondary"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareSubject;