import { Trash3, CheckLg } from 'react-bootstrap-icons';
import { Button } from "react-bootstrap";
import { useState } from 'react';

function CourseRow(props) {

  const temp = props.loggedIn ? true : false
    
  /*** to manage the view of the description for each row */
  const [toggleDescription, setToggleDescription] = useState(temp)

  /*** 
   * 
   */

  return (
    <tr>
      <CourseData loggedIn={props.loggedIn} course={props.course} key={props.course} toggleDescription={toggleDescription} profile={props.profile} check={props.check} temporaryStudyPlan={props.temporaryStudyPlan} temporaryCredits={props.temporaryCredits} validate={props.validate}/>
      <CourseActions loggedIn={props.loggedIn} course={props.course} profile={props.profile} addCourse={props.addCourse} removeCourse={props.removeCourse} addOrRemove={props.addOrRemove} code={props.course.code} setToggleDescription={setToggleDescription} toggleDescription={toggleDescription} finalPlan={props.finalPlan} temporaryPlanType={props.temporaryPlanType} committed={props.committed}/>
    </tr>
  );

}

function CourseData(props) {

  /*** to correctly display preparatory and incompatible courses */
  const incompatibleWith = String(props.course.incompatibleWith).replace(",", ", ")
  const preparatoryCourse = String(props.course.preparatoryCourse).replace(",", ", ")

  /*** styles to mark courses as compatible and incomaptible */
  const accepted = { 'backgroundColor': '#badbcc	' }
  const notAccepted = { 'backgroundColor': '#f5c2c7	' }


  if (!props.loggedIn) {
    return (
      <>
        <td>{props.course.code}</td>
        <td>{props.course.name}</td>
        <td>{props.course.credits}</td>
        <td>{props.course.maxStudents}</td>
        <td>{props.course.enrolled ? props.course.enrolled : " "}</td>
        <td>{props.toggleDescription ? incompatibleWith : " "}</td>
        <td>{props.toggleDescription ? preparatoryCourse : " "}</td>
      </>
    );
  } else {
    if (props.check === 1) {
      return (
        <>
          {props.validate(props.course)
            ? <td style={accepted}>{props.course.code}</td>
            : <td style={notAccepted}>{props.course.code}</td>
          }
          <td>{props.course.name}</td>
          <td>{props.course.credits}</td>
          <td>{props.course.maxStudents}</td>
          <td>{props.course.enrolled ? props.course.enrolled : " "}</td>
          <td>{props.toggleDescription ? incompatibleWith : " "}</td>
          <td>{props.toggleDescription ? preparatoryCourse : " "}</td>
        </>
      );
    }
    return (
      <>
        <td>{props.course.code}</td>
        <td>{props.course.name}</td>
        <td>{props.course.credits}</td>
        <td>{props.course.maxStudents}</td>
        <td>{props.course.enrolled ? props.course.enrolled : " "}</td>
        <td>{props.toggleDescription ? incompatibleWith : " "}</td>
        <td>{props.toggleDescription ? preparatoryCourse : " "}</td>
      </>
    );
  }


}

function CourseActions(props) {

  if(props.loggedIn===true){

    if(props.finalPlan===1){
      return ""
    }else{
      if(props.temporaryPlanType === 0){
        return <td>N/A</td>
      }else{
        if(props.addOrRemove === 0){ // generate the remove button
          return <td><Button size="sm" variant="outline-danger" onClick={() => { props.removeCourse(props.course) }}>Remove <Trash3 /></Button></td>
        }else{ // generate the add button
          return <td><Button size="sm" variant="outline-success" onClick={() => { props.addCourse(props.course) }}>Add <CheckLg /></Button></td>
        }
      }
      
    }

  }

    /*if(props.loggedIn===true && props.temporaryPlanType !== 0){
      if(props.profile.fullTime>=0){
        if(props.finalPlan !== 1){
          if(props.addOrRemove === 0){ // generate the remove button
            return <td><Button size="sm" variant="outline-danger" onClick={() => { props.removeCourse(props.course) }}>Remove <Trash3 /></Button></td>
          }else{ // generate the add button
            return <td><Button size="sm" variant="outline-success" onClick={() => { props.addCourse(props.course) }}>Add <CheckLg /></Button></td>
          }
        }else{
          return ""
        }
        
      }else{
        return <td>N/A</td>
      }

    } else if(props.loggedIn===true && props.temporaryPlanType === 0){
      if(props.committed===1){
        return ""
      }else{
        return <td>N/A</td>
      }
    }
    */
    else { // not logged in -> generate the row compatible with the main page behaviour

      if (props.course.incompatibleWith.length === 0 && props.course.preparatoryCourse.length === 0) { // no information to show -> don't show the toggle description button
        return <td></td>
      } else { //there are information to show -> show the toggle description button
        return (
          props.toggleDescription
            ? <td><Button size="sm" variant="primary" onClick={() => { props.setToggleDescription(!props.toggleDescription) }}>Hide details</Button></td>
            : <td><Button size="sm" variant="outline-primary" onClick={() => { props.setToggleDescription(!props.toggleDescription) }}>Show details</Button></td>
        )
      }
    }
  



}

export default CourseRow;
