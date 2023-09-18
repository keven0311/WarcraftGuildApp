import React, { useEffect } from "react";
import "../../styles/raidForm.css";
import { Container } from "react-bootstrap";
import RaidFormGroup from "../../components/RaidFormGroup";
import { useDispatch, useSelector } from "react-redux";
import { getGuildAllRaidForms } from "../../store/slices/raidFormSlice";
import {
  fetchSingleGuild,
  selectSingleGuild,
} from "../../store/slices/guildSlice";
import { useParams } from "react-router-dom";
import { readableDate } from "../../utilities/overallUtilities";

function RaidFormView() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const guild = useSelector(selectSingleGuild);

  useEffect(() => {
    dispatch(fetchSingleGuild(name));
  }, [dispatch, name]);

  return (
    <Container>
      <div className="my-5">
        <div className="my-3 d-flex justify-content-center">
          <h1>Guild Raid Groups and Times</h1>
        </div>
        <h2>{guild.name}</h2>
        <span>
          <h4>{guild.region}</h4>
          <h4>{guild.server}</h4>
        </span>
      </div>
      <div className="raidforms_container">
        {guild.raidforms && guild.raidforms.length > 0 ? (
          guild.raidforms?.map((raidform) => (
            <div key={raidform.id} className="form_container">
              <div className="w-25">
                <h4>Raid time:</h4>
                <h6>{readableDate(raidform.time)}</h6>
              </div>
              <div className="d-flex w-50">
                <div>
                  <div>{<RaidFormGroup group={raidform.groupOne} />}</div>
                </div>
                <div>
                  <div>{<RaidFormGroup group={raidform.groupTwo} />}</div>
                </div>
                <div>
                  <div>{<RaidFormGroup group={raidform.groupThree} />}</div>
                </div>
                <div>
                  <div>{<RaidFormGroup group={raidform.groupFour} />}</div>
                </div>
              </div>
              <div className="w-25">
                <h5>Raid note:</h5> {raidform.description}
              </div>
            </div>
          ))
        ) : (
          <p>No raid forms assigned...</p>
        )}
        {}
      </div>
    </Container>
  );
}

export default RaidFormView;
