import React, { Component } from 'react';
import { Image } from 'react-native';
import Images from './Images'

export default class bProgressiveImage extends Component {
  state = { showDefault: true, error: false };

  render() {
    var image = this.state.showDefault ?  Images.bplaceholder  : ( this.state.error ? Images.bplaceholder : { uri: this.props.uri } );

    return (
      <Image style={this.props.style} 
             source={image} 
             onLoadEnd={() => this.setState({showDefault: false})} 
             onError={() => this.setState({error: true})}
             resizeMode={this.props.resizeMode}/>



            //  <Animatable.Image
            //  delay={2000}
            
            //  animation={'zoomInUp'}
            //  style={this.props.style}
            //  resizeMode={this.props.resizeMode}
            //  onLoadEnd={() => this.setState({ showDefault: false })}
            //  onError={() => this.setState({ error: true })} />
    );
  }
}
