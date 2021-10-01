import { motion } from 'framer-motion';
import { elevationEffect } from '../../../animations/motionVariants';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInAtom } from '../../../global/states/globalStates';
import UserSidebar from './Sidebar';
import ProfileSection from './sections/Profile/Profile';
import EstatesSection from './sections/Estates/Estates';

export const userSectionAtom = atom({
  key: 'userSidebarState',
  default: 'profile',
});

function UserDashboard() {
  const section = useRecoilValue(userSectionAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInAtom);

  return (
    <div className="dashboard">
      <UserSidebar />
      <motion.div
        variants={elevationEffect}
        initial="first"
        animate="second"
        className="user-dashboard-section card glass shadow rounded-3 text-center p-5 me-2"
      >
        {section === 'profile' ? (
          <ProfileSection />
        ) : (
          section === 'estates' && <EstatesSection />
        )}
      </motion.div>
    </div>
  );
}

export default UserDashboard;
