import Button from "@/components/Button";
import {FormEvent} from "react";
import {FormAction} from "@/pages/Homepage.tsx";

const ResumeForm = ({handleSubmit}: {
    handleSubmit: (e: FormEvent<HTMLFormElement>, action: FormAction) => void
}) => {
    return (
        <form
            onSubmit={(e) => handleSubmit(e, "RESUME")}
            className="flex flex-col max-w-sm w-full space-y-2 mx-auto">
            <Button type="submit" className="text-white">
                Resume
            </Button>
        </form>
    );
};

export default ResumeForm;