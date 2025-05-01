import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'

const UserCard = ({ likedProblemsIDs, completedProblemsIDs }: any) => {
  const user = useUserContext()
  return (
    <div className="rounded-lg bg-white border-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-3xl m-2 font-menlo font-bold">Hi, {user.username}</p>
        <div className="w-full grid grid-cols-[1fr_1fr] items-center">
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              style={{ color: 'red' }}
            />
            <p className="text-2xl font-semibold font-menlo">
              {likedProblemsIDs ? likedProblemsIDs.length : 0}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon
              icon={faCheck}
              size="2x"
              style={{ color: 'green' }}
            />
            <p className="text-2xl font-semibold font-menlo">
              {completedProblemsIDs ? completedProblemsIDs.length : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserCard
