import React, { useMemo } from "react";

import PlayerCard from "components/common/PlayerCard/PlayerCard";
import MyButton from "components/common/MyButton/MyButton";

import { IUser, IUsersState, RolesUsersEnum } from "redux/reducer/membersReducer/types";
import { getMembers } from "redux/reducer/selectors";

import { useTypedSelector } from "hooks/useTypedSelector";

import styles from './index.module.scss';

const TeamMembers: React.FC = () => {
  const { members } = useTypedSelector<IUsersState>(getMembers);

  const admin = useMemo<IUser | undefined>(() => {
    return members.find((member) => member.role === RolesUsersEnum.ADMIN)
  }, [members]);

  const users = useMemo<IUser[]>(() => {
    return members.filter((member) => member.role === RolesUsersEnum.REGULAR)
  }, [members]);
  
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
