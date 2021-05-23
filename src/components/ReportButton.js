/*
 ReportButton.js

  The `report` component is the implementation of our like button

  The bar has two states determined by `liked`. If false, the like button will show up unfilled and grey, if true, the like button will turn red, indicating that its been liked

  When a button is clicked, `handleClick` is called with "like" or "unlike"

  props:
    liked - a Boolean indicating if the post has already been liked or not
    handleClick - a function called when a button is clicked (required)
*/
import PropTypes from "prop-types";
// import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import WarningIcon from "@material-ui/icons/Warning";
import styles from "../styles/ReportButton.module.css";

export default function ReportButton({ reported, handleClick }) {

let reportView;

//if the button has not been reported
  if(!reported){ 
    reportView = 
     <WarningIcon style={{ fontSize: 40 }} className={styles.empty} type="report" id="report" onClick= {() => handleClick("reported") } > </WarningIcon>
  
  }
  else{
    reportView =
    <WarningIcon style={{ fontSize: 40 }} className={styles.filled} type="report" id="report" color = "secondary" onClick= {() => handleClick("unreported") } > </WarningIcon>
  }

return( 
  reportView
);
}

ReportButton.propTypes = {
  reported: PropTypes.bool,
  handleClick: PropTypes.func,
}