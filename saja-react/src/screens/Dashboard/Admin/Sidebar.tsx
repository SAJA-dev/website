import { motion } from "framer-motion";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { crossfadeAnimation } from "../../../animations/motionVariants";
import { adminSectionAtom } from "./Admin";

function AdminSidebar() {
    const [section, setSection] = useRecoilState(adminSectionAtom);

    return (
        <motion.div
            variants={crossfadeAnimation}
            initial="first"
            animate="second"
            className="sidebar gap-1 card glass shadow rounded-3 text-center p-1"
        >
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="profile-tooltip">پروفایل</Tooltip>}
            >
                <Button
                    variant=""
                    className={
                        section === "profile" ? "btn-purple" : "btn-light"
                    }
                    onClick={() => {
                        setSection("profile");
                    }}
                >
                    <i className="edit-icon bi-grid-1x2-fill"></i>
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="users-tooltip">کاربران</Tooltip>}
            >
                <Button
                    variant=""
                    className={section === "users" ? "btn-purple" : "btn-light"}
                    onClick={() => {
                        setSection("users");
                    }}
                >
                    <i className="edit-icon bi-people-fill"></i>
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="estates-tooltip">املاک</Tooltip>}
            >
                <Button
                    variant=""
                    className={
                        section === "estates" ? "btn-purple" : "btn-light"
                    }
                    onClick={() => {
                        setSection("estates");
                    }}
                >
                    <i className="edit-icon bi-grid-3x3-gap-fill"></i>
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="templates-tooltip">قالب ها</Tooltip>}
            >
                <Button
                    variant=""
                    className={
                        section === "templates" ? "btn-purple" : "btn-light"
                    }
                    onClick={() => {
                        setSection("templates");
                    }}
                >
                    <i className="edit-icon bi-diagram-3-fill"></i>
                </Button>
            </OverlayTrigger>
        </motion.div>
    );
}

export default AdminSidebar;
