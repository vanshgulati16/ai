import React, { useState, useEffect, useRef } from "react";
import VectorIcon from '@/public/Vector.svg';
import InsertIcon from '@/public/Insert.svg';
import RegenerateIcon from '@/public/Regenerate.svg';

interface PromptModalProps {
    open: boolean;
    handleClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ open, handleClose }) => {
    const [userPrompt, setUserPrompt] = useState("");
    const [savedPrompt, setSavedPrompt] = useState("");
    const [aiReply, setAiReply] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("PromptModal rendered, open:", open);

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCloseAndClean();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleCloseAndClean = () => {
        setUserPrompt("");
        setSavedPrompt("");
        setAiReply("");
        handleClose();
    };

    const handleGenerate = () => {
        setSavedPrompt(userPrompt);
        setAiReply("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
        setUserPrompt("");
    }

    const handleInsert = () => {
        const placeHolder = document.querySelector(".msg-form__placeholder");
        placeHolder?.remove();
        const textBox = document.querySelector(".msg-form__contenteditable") as HTMLElement;
        if (textBox) {
            textBox.textContent = aiReply;
            const range = document.createRange();
            range.selectNodeContents(textBox);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        handleCloseAndClean();
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{
                zIndex: 2147483647,
                display: open ? 'flex' : 'none'
            }}
        >
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-xl" style={{ width: '400px' }}>
                {aiReply && (
                    <>
                        <div className="mb-4 text-right">
                            <span className="inline-block bg-gray-100 rounded-lg text-xl text-gray-600 p-3">
                                {savedPrompt}
                            </span>
                        </div>
                        <div className="mb-4 p-3 bg-blue-100 text-gray-600 rounded-lg text-xl">
                            {aiReply}
                        </div>
                    </>
                )}
                <input
                    type="text"
                    placeholder="Your prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 text-lg"
                />
                <div className="flex justify-end">
                    {!aiReply ? (
                        <button
                            onClick={handleGenerate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-lg font-semibold"
                        >
                            <img src={VectorIcon} alt="Generate" className="w-6 h-6 mr-2" />
                            Generate
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleInsert}
                                className="text-gray-500 px-4 py-2 rounded-lg flex items-center mr-2 text-lg font-semibold"
                                style={{ border: '2px solid #9E9E9E' }}
                            >
                                <img src={InsertIcon} alt="Insert" className="w-6 h-6 mr-2" />
                                Insert
                            </button>
                            <button
                                onClick={handleGenerate}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-lg font-semibold"
                            >
                                <img src={RegenerateIcon} alt="Regenerate" className="w-6 h-6 mr-2" />
                                Regenerate
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromptModal;
