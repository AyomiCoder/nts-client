import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || "");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state

    // Add Note
    const addNewNote = async () => {
        setLoading(true); // Start loader
        try {
            const response = await axiosInstance.post("/notes", {
                title,
                content,
                tags,
            });
            
            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                showToastMessage("Note Added Successfully");
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false); // Stop loader
        }
    }

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id;
        setLoading(true); // Start loader
        try {
            const response = await axiosInstance.put("/notes/" + noteId, {
                title,
                content,
                tags,
            });
            
            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                showToastMessage("Note Updated Successfully");
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false); // Stop loader
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Please Enter a title");
            return;
        }

        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    }

    return (
        <div className="relative">
            <button className="absolute w-10 h-10 rounded-full flex items-center justify-center -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Go To Gym At 5"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    disabled={loading} // Disable input during loading
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    disabled={loading} // Disable textarea during loading
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput
                    tags={tags}
                    setTags={setTags}
                    disabled={loading} // Disable tag input during loading
                />
            </div>

            {error && <p className="text-red-500 text-xs mt-5 p-3">{error}</p>}

            <button 
                className="btn-primary font-medium mt-5 p-3 flex justify-center items-center"
                onClick={handleAddNote}
                disabled={loading} // Disable button during loading
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                ) : (
                    type === "edit" ? "UPDATE" : "ADD"
                )}
            </button>
        </div>
    );
};

export default AddEditNotes;
