import TruckEntryForm from "./components/TruckEntryForm.jsx";
import AdminProfile from "./components/AdminProfile.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, updateFormData } from "./store/slices/entryFormSlice.js";
import { setProfileData } from "./store/slices/adminProfileSlice.js";
import ChatWidget from "./components/ChatWidget.jsx";
import Navigation from "./navigation/Navigation.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useEffect } from "react";
import { auth, db } from "./firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { setLoading } from "./store/slices/loadingSlice.js";
import DriverEntryForm from "./components/DriverEntryForm.jsx";
import { addDriver } from "./store/slices/driverFormSlice.js";
import TruckEntryDetails from "./components/TruckEntryDetails.jsx";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isEntryFormOpen, formData } = useSelector((state) => state.entryForm);
  const { isAdminProfileOpen, isAdminProfileEditable, profileData } =
    useSelector((state) => state.adminProfile);
  const { isDriverFormOpen } = useSelector((state) => state.driverForm);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            dispatch(setProfileData(userSnapshot.data()));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching document: " + error.message);
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
        navigate("/login");
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const truckDoc = doc(db, "truck-entries", user.uid);
        try {
          const userSnapshot = await getDoc(truckDoc);
          if (userSnapshot.exists()) {
            dispatch(addFormData(userSnapshot.data().entries));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching document: " + error.message);
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
        navigate("/login");
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const driverDoc = doc(db, "driver-entries", user.uid);
        try {
          const userSnapshot = await getDoc(driverDoc);
          if (userSnapshot.exists()) {
            dispatch(addDriver(userSnapshot.data().entries));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching document: " + error.message);
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
        navigate("/login");
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleEntryFormUpdate = (key, value) => {
    dispatch(updateFormData({ key, value }));
  };

  return (
    <>
      <Navigation />

      {isLoading && <LoadingSpinner />}

      {isEntryFormOpen && (
        <TruckEntryForm
          formData={formData}
          isEntryFormOpen={isEntryFormOpen}
          handleUpdate={handleEntryFormUpdate}
        />
      )}

      {isAdminProfileOpen && (
        <AdminProfile
          profileData={profileData}
          isFormOpen={isAdminProfileOpen}
          isEditable={isAdminProfileEditable}
        />
      )}

      {isDriverFormOpen && <DriverEntryForm isFormOpen={isDriverFormOpen} />}

      <TruckEntryDetails />

      <ChatWidget />
    </>
  );
}

export default App;
