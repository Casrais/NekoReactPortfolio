import * as React from 'react';
import { connect } from 'react-redux';
import Posts from "./Posts";
/*import Carousel from "./CarouselFiles";*/

const Home = () => (
    <div>
    {/*<Carousel/>*/}
    <Posts/>
  </div>
);

export default connect()(Home);
