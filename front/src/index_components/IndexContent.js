import React from "react";

import Catalog from "./Catalog";
import {Url} from "../App";
import OfferContent from "./OfferContent";

export default function () {
    const url = React.useContext(Url);
    const offerContent= [
        {
            image: url + "delivery.svg",
            head: "Free Delivery",
            text: "Worldwide delivery on all. Authorit tively morph next-generation innov tion with\n" +
                "                                        extensive\n" +
                "                                        models.",
        }
,
        {
            image: url + "sale.svg",
            head: "Sales & discounts",
            text: "Worldwide delivery on all. Authorit tively morph next-generation innov tion with\n" +
                "                                        extensive\n" +
                "                                        models.",
        },
        {
            image: url+"quality.svg",
            head: "Quality assurance",
            text: "Worldwide delivery on all. Authorit tively morph next-generation innov tion with\n" +
                "                                        extensive\n" +
                "                                        models.",
        },
    ]
    const images= [
            "https://raw.githubusercontent.com/GeorgeCybersport/JavaScript-Basic/master/offer1.jpg",
            "https://raw.githubusercontent.com/GeorgeCybersport/JavaScript-Basic/master/offer2.jpg",
            "https://raw.githubusercontent.com/GeorgeCybersport/JavaScript-Basic/master/offer3.jpg",
            "https://raw.githubusercontent.com/GeorgeCybersport/JavaScript-Basic/master/offer4.jpg"
        ]
    return (
        <>
            <div className="topPicture">
                <div className="container">
                    <div className="topPicture_line"></div>
                    <div className="topPictureText">
                        <h1>THE BRAND</h1>
                        <h1>OF LUXERIOUS <span>FASHION</span></h1>
                    </div>
                </div>
            </div>
            <div className="hot-deal">
                <div className="container">
                    {images.map((image, index)=>(
                        <div className="hot-deal-content" key={index}>
                            <a href="#">
                                <div className="hd-textbox">
                                    <p>hot deal</p>
                                    <h2>for men</h2>
                                </div>
                            </a>
                            <a href="#"><img src={image} alt="men"/></a>
                        </div>
                    ))}
                </div>
            </div>
            <Catalog/>
            <button className="browse">Browse All Product<i className="fas fa-long-arrow-alt-right"></i></button>
            <div className="offer">
                <div className="container">
                    <div className="offer-textbox">
                        <h1>30% <span>OFFER</span></h1>
                        <h2>FOR WOMEN</h2>
                    </div>
                    <div className="offer-blocks">
                        {offerContent.map(({image, head, text}, index)=>(
                            <OfferContent key={index} iteminfo={{image, head, text}}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}