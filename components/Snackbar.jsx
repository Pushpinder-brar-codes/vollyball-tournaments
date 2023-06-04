import { useAtom } from "jotai";
import { Snackbar } from "react-native-paper";
import { toastAtom } from "./State/Store";

const MySnackbar = () => {

  const [toastData, setToastData] = useAtom(toastAtom);

    const onDismissSnackBar = () =>{
        setToastData({...toastData,show:false})
    }

    return (
      <Snackbar
        visible={toastData.show}
        onDismiss={onDismissSnackBar}
        duration={4000}
      >
        {toastData.msg}
      </Snackbar>
    );
}

export default MySnackbar

