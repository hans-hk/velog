// @flow
import React from 'react';
import defaultThumbnail from 'static/images/default_thumbnail.png';
import Button from 'components/common/Button';
import { type Profile } from 'store/modules/profile';
import { Helmet } from 'react-helmet';
import { resizeImage } from 'lib/common';
import './UserHead.scss';

type Props = {
  username: string,
  profile: Profile,
  self: boolean,
  following: ?boolean,
  rawTagName: ?string,
  onToggleFollow: () => void,
};

const UserHead = ({ username, profile, self, following, onToggleFollow, rawTagName }: Props) => {
  const title = `${username} (${profile.display_name})${rawTagName ? ` #${rawTagName}` : ''}`;
  return (
    <div className="UserHead">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={profile.short_bio} />
      </Helmet>
      <img src={resizeImage(profile.thumbnail || defaultThumbnail, 256)} alt="thumbnail" />
      <div className="user-info">
        <section className="top">
          {!self &&
            following !== undefined && (
              <div className="subscribe-wrapper">
                {following ? (
                  <Button className="subscribe" theme="gray" onClick={onToggleFollow}>
                    구독중
                  </Button>
                ) : (
                  <Button className="subscribe" onClick={onToggleFollow}>
                    구독하기
                  </Button>
                )}
              </div>
            )}
          <div className="username">@{username}</div>
        </section>
        <section className="mini-profile">
          <h2>{profile.display_name}</h2>
          <p>{profile.short_bio}</p>
        </section>
      </div>
    </div>
  );
};

UserHead.Placeholder = () => (
  <div className="UserHead placeholder">
    <div className="fake-thumbnail" />
    <div className="user-info">
      <section className="top">
        <div className="username">
          <div className="gray-block _username" />
        </div>
      </section>
      <section className="mini-profile">
        <div className="gray-block _name" />
        <div className="gray-block _description" />
      </section>
    </div>
  </div>
);

export default UserHead;
