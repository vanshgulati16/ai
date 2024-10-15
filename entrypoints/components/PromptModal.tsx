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
        setAiReply("");
        handleClose();
    };

    const handleGenerate = () => {
        setAiReply("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
    }

    const handleInsert = () => {
        const placeHolder = document.querySelector(".msg-form__placeholder");
        placeHolder?.remove();
        const textBox = document.querySelector(".msg-form__contenteditable") as HTMLElement;
        if (textBox) {
            textBox.textContent = aiReply;
            // update the position of cursor
            const range = document.createRange();
            range.selectNodeContents(textBox);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        setUserPrompt("");
        setAiReply("");
        handleClose();
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{
                zIndex: 2147483647,
                display: open ? 'flex' : 'none'
            }}
        >
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-xl" style={{ width: '500px' }}>
                <h2 className="text-xl font-bold mb-4">AI Reply Prompt</h2>
                {aiReply ? (
                    <div className="mb-4 p-2 bg-blue-100 rounded">
                        <p>{aiReply}</p>
                    </div>
                ) : null}
                <input
                    type="text"
                    placeholder="Your prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end">
                    {!aiReply ? (
                        <button
                            onClick={handleGenerate}
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                        >
                            <img src={VectorIcon} alt="Generate" className="w-4 h-4 mr-2" />
                            Generate
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleInsert}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center mr-2"
                            >
                                <img src={InsertIcon} alt="Insert" className="w-4 h-4 mr-2" />
                                Insert
                            </button>
                            <button
                                onClick={handleGenerate}
                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                            >
                                <img src={RegenerateIcon} alt="Regenerate" className="w-4 h-4 mr-2" />
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
