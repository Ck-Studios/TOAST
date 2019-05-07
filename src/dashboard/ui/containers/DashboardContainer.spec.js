import React from "react";
import {configure,  shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Text, TouchableOpacity} from "react-native";
import DashboardContainer from "./DashboardContainer";

configure({adapter: new Adapter()});

describe('Dashboard', () => {
  it('컴포넌트 렌더링', () => {
    const wrapper = shallow(<DashboardContainer/>);
    expect(wrapper.length).toBe(1);
  });

  it('초기 값 설정', () => {
    const wrapper = shallow(<DashboardContainer/>);
    expect(wrapper.find(Text).props().children).toEqual([10, " 입니다."]);
  });

  it('클릭시 값 증가', () => {
    const wrapper = shallow(<DashboardContainer/>);
    expect(wrapper.find(Text).props().children).toEqual([10, " 입니다."]);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(wrapper.find(Text).props().children).toEqual([8, " 입니다."]);
    wrapper.find(TouchableOpacity).simulate('press');
    wrapper.find(TouchableOpacity).simulate('press');
    expect(wrapper.find(Text).props().children).toEqual([4, " 입니다."]);
  });
});
