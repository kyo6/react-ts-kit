import React from "react";
import {Button} from 'antd'
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
interface RouteParams {
  id: string;
}
export default () => {
  const params = useParams<RouteParams>();
  const match = useRouteMatch();
  const history = useHistory();
  const pushRouteParams = () => {
    history.push('/')
  };

  return (
    <>
    <div>路由参数：{params.id}</div>
    <div>路由路径：{ match && match.url }</div>
    <div>
      <Button onClick={ pushRouteParams }>返回主页</Button>
    </div>

    </>
  )
 
};
