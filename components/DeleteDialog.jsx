import React from "react";

const DeleteDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  elementToDelete,
  handleDelete,
}) => {
  if (!deleteDialogOpen || !elementToDelete) return null;

  // Check if it's an appointment and extract relevant info
  const isAppointment = elementToDelete?.lawyerId;

  return (
    <div className="fixed inset-0 mx-4 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg max-w-sm w-full p-6 border border-zinc-700">
        {/* Header */}
        <h2 className="text-lg font-semibold text-red-400">Confirm Deletion</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2">
          {isAppointment ? (
            <>
              You're about to delete your appointment with{" "}
              <span className="font-semibold">
                {elementToDelete.lawyerId?.name || "Unknown Lawyer"}
              </span>{" "}
              on{" "}
              <span className="font-semibold">
                {new Date(elementToDelete.date).toLocaleDateString()}
              </span>
              . This action cannot be undone.
            </>
          ) : (
            <>
              This will permanently delete the item{" "}
              <span className="font-semibold">{elementToDelete?.category || "Unnamed"}</span>. This action cannot be undone.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-2 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 transition"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 transition"
            onClick={() => handleDelete(elementToDelete._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
