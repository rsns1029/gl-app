import React from 'react';
import {Image, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface ProfileBodyProps {
  name: string;
  accountName?: string;
  profileImage: any; // Change 'any' to the appropriate image type
  post: string;
  followers: string;
  following: string;
}

const ProfileBody: React.FC<ProfileBodyProps> = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
}) => {
  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {accountName}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'white',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: 'white',
                paddingHorizontal: 15,
              }}
            />
            <Feather
              name="menu"
              style={{
                fontSize: 25,
                color: 'white',
              }}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <Image
            source={profileImage}
            style={{
              resizeMode: 'cover',
              width: 135,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              paddingLeft: 10,
              paddingVertical: 5,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {name}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            {post}
          </Text>
          <Text style={{color: 'white'}}>게시물</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            {followers}
          </Text>
          <Text style={{color: 'white'}}>팔로워</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            {following}
          </Text>
          <Text style={{color: 'white'}}>팔로잉</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileBody;
