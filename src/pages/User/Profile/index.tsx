import { Box } from "@/components/Atoms";
import { IUser } from "@/interface";
import { User } from "@/components/Pages"
import { useLoaderData } from "react-router-dom";

function Profile() {
    const user = useLoaderData() as unknown as IUser.UserProfile;
    return (
        <Box>
            <User.UserProfile user={user} />
        </Box>
    );
}

export default Profile;
