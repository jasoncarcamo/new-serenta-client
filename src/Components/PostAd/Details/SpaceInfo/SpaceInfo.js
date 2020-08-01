import React from "react";

export default class SpaceInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-space-info">
                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Bed Rooms <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <select className="post-ad-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </section>

                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Bath Rooms <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <select className="post-ad-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </section>

                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Square Feet <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <input type="text" id="post-ad-squareft"/>
                        <p className="post-ad-squareft-label">sq ft</p>
                    </div>
                </section>
            </section>
        );
    };
};