import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function GuildMembers() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Guild Name</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>class</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>character one</td>
            <td>rogue</td>
            <td>123@gmail.com</td>
          </tr>
          <tr>
            <td>character two</td>
            <td>preist</td>
            <td>456@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GuildMembers;
