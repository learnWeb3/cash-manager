import * as React from "react";
import ScreenLayout from "../../layouts/ScreenLayout";
import ProfileForm from "../../components/ProfileForm/index";

const ProfileScreen = ({ route, navigation }) => {
  return (
    <ScreenLayout >
      <ProfileForm />
    </ScreenLayout>
  );
};
export default ProfileScreen;
