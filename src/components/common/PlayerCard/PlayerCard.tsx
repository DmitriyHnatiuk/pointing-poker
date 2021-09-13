import React from "react";
import { useDispatch } from "react-redux";

import { IUser, RolesUsersEnum } from "redux/reducer/userReducer/types";
import { deleteUser } from "redux/reducer/userReducer";

import unknowAvatar from 'assets/images/CardPlayer/unknow-avatar.svg';
import userDeleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './PlayerCard.module.scss';

const PlayerCard: React.FC<{ user: IUser }> = ({ user }) => {
  const { firstName, lastName, job, role, avatar } = user;

  const dispatch = useDispatch();

  const onDeleteUser = () => {    
    dispatch(deleteUser(user))
  }
  
  return (
		<div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.member}>        
          <div className={styles.avatar}>
            <img src={ avatar || unknowAvatar} alt="avatar" />
          </div>
          <div className={styles.player}>
            { 
              role === RolesUsersEnum.ADMIN && <div className={styles.admin}>Admin</div>
            }
            <div className={styles.name}>{`${firstName} ${lastName}`}</div>
            <div className={styles.position}>{job}</div>
        </div>
        </div>
        <div className={styles.delete}>
          { role === RolesUsersEnum.REGULAR && <div>
              <img src={userDeleteImage} alt="del" onClick={onDeleteUser} aria-hidden="true"/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default PlayerCard;
