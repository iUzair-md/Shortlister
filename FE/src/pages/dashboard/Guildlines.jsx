import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Typewriter from "typewriter-effect";
import './guildlines.scss'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const Guildlines = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isLoading, error, refetch } = useQuery(
        "fetchSkillsFromTable",
        () => axios.get("http://localhost:8000/api/skills/from-table", { withCredentials: true }),
        {
            enabled: false,
            staleTime: 0,
        }
    );

    const handleClick = async () => {
        try {
            setLoading(true);
            await refetch();
            navigate('/dashboard/testarea');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="guidelines">
                <h1>Guidelines</h1>
                <div className="guidlinestype">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(
                                    "<span>1. Your skills mentioned in the resume have been extracted and are visible in the Skills Set section.</span><br/>"
                                )
                                .typeString(
                                    "<span>2. You'll be presented with 3 questions per skill. Answer each question one by one.</span><br/>"
                                )
                                .typeString(
                                    "<span>3. Your answers will be evaluated by ChatGPT. Feedback will be provided after each answer.</span><br/>"
                                )
                                .typeString(
                                    "<span>4. Points awarded based on answer accuracy. Track your points in the scoreboard.</span><br/>"
                                )
                                .typeString(
                                    "<span>5. This process will continue for each skill mentioned in your resume.</span><br/>"
                                )
                                .typeString(
                                    "<span>6. Upon completing all questions for all skills, you will receive a summary of your performance.</span><br/>"
                                )
                                .typeString(
                                    "<span>7. Sit back, relax, and enjoy the challenge of showcasing your skills! <br/> Good luck, and we hope you find this experience valuable and insightful.</span><br/>"
                                )
                                .start()
                                .callFunction(() => {
                                    setShowButton(true);
                                });
                        }}
                        options={{ delay: 5 }}
                    />
                </div>
                <div className="buttondvi">
                    {showButton && (
                        <button onClick={handleClick} disabled={loading || isLoading}>
                            {loading || isLoading ? "Loading..." : "Start"}
                        </button>
                    )}
                    {(loading || isLoading) && <p>Please wait, the questions are being generated...</p>}
                    {error && <p>Error: {error.message}</p>}
                </div>
            </div>
        </DashboardLayout>
    );
};



export default Guildlines;
