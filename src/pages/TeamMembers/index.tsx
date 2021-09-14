import React from "react";

import PlayerCard from "components/common/PlayerCard/PlayerCard";
import MyButton from "components/common/MyButton/MyButton";

import { IUsersState, RolesUsersEnum } from "redux/reducer/userReducer/types";

import { useTypedSelector } from "hooks/useTypedSelector";

import styles from './index.module.scss';

const TeamMembers: React.FC = () => {
  const { members } = useTypedSelector<IUsersState>(state => state.membersReducer);

  const admin = members.find((member) => member.role === RolesUsersEnum.ADMIN);
  const users = members.filter((member) => member.role === RolesUsersEnum.REGULAR);
  
  return (
		<section className={styles.section}>
      <h3>
        Spring planning:
      </h3>
			<div className={styles.scram}>
				<span>Scram master:</span>
        <PlayerCard user={admin!} />
			</div>
      <div className={styles.exit}>
        <MyButton value='Exit' />
      </div>
      <div className={styles.team}>
        <h3>Members:</h3>
        <div className={styles.members}>
          { users.length !== 0 
            ? users.map(user => {
              return <PlayerCard user={user} key={user.id} />
              })
            : <h4>Waiting for team members...</h4>
          }
        </div>
      </div>
		</section>
  )
}

export default TeamMembers;
