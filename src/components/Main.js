require('normalize.css/normalize.css');
require('styles/App.scss');
var imageDatas = require('../data/imageData.json');
import React from 'react';

imageDatas = (function getImageUrl (imageDatasArr) {
    for(var i = 0, length1 = imageDatasArr.length; i < length1; i++){
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
        <section className = "stage">
            <section className = "img-sec">
            </section>
            <nav className = "controller-nav">
            </nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
