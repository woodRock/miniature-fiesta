import React from "react";
import { useHistory } from "react-router-dom";
import propTypes from "prop-types";
import { VerticalTimeline, VerticalTimelineElement }  from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";
import { colors } from "./MarkerMap";

import EducationIcon from "../assets/education.png";
import WorkIcon from "../assets/work.png";
import Home from "../assets/home.png";

const VTimeline = ({markers}) => {
  return (
    <VerticalTimeline className={ "timeline" } >
      <HomeButton />
      { markers.map( ({name, url, type, date}, index) => (
        <VerticalTimelineElement
          className={ type == "work" ? "vertical-timeline-element--work" : "vertical-timeline-element--education" }
          date={ date }
          icon={ type == "work" ? <Icon source={ WorkIcon } /> : <Icon source={ EducationIcon } /> }
          iconStyle={ { background: colors[type], color: "#fff" } }
          key={ index }
        >
          <h3 className="vertical-timeline-element-title">{name}</h3>
          <h4 className="vertical-timeline-element-subtitle">{type}</h4>
          <p>
            <a href={ url }> See More...</a> 
          </p>
        </VerticalTimelineElement>
    ))}
      <HomeButton />
    </VerticalTimeline>
  );
    };

VTimeline.propTypes = {
  markers: propTypes.array.isRequired
};

const HomeButton = () => {
  const history = useHistory();

  function home() {
    history.push("/");
  }
  return (
    <VerticalTimelineElement
      icon={ <Icon source={ Home } /> }
      iconOnClick={ () => home() }
      iconStyle={ { background: "rgb(16, 204, 82)", color: "#fff" } }
    />);
  };

const Icon = ({source}) =>  (
  <img
    src={ source } 
    style={ { 
      maxWidth : "100%", 
      bottom: "100px",
      borderRadius: "50%"
    } }
  />
);

Icon.propTypes = {
    source: propTypes.string.isRequired
};

export default VTimeline;