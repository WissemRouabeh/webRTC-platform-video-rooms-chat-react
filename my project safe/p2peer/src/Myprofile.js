import React from "react";
import "./myprofile.css";
import EditIcon from "@material-ui/icons/Edit";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
function Myprofile() {
  return (
    <div className="myprofile__container">
      <div className="myprofile__banner">
        <img
          className="myprofile__pic"
          src="https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/people/la-vie-des-people/news/jack-falahee-le-beau-gosse-de-murder-va-vous-envouter/le-selfie-plage/55353534-1-fre-FR/Le-selfie-plage.png"
          alt="profile picture"
        />
        <div className="myprofile__name">Wissem Rouabeh, 25ans</div>
        <div className="myprofile__socialmedia">
          <div className="myprofile__socialmedia_github">
            <GitHubIcon />
          </div>
          <div className="myprofile__socialmedia__facebook">
            <FacebookIcon />
          </div>
          <div className="myprofile__socialmedia_whatsapp">
            <WhatsAppIcon />
          </div>
          <div className="myprofile__socialmedia__linkedin">
            <LinkedInIcon />
          </div>
          <div className="myprofile__socialmedia_website">
            <LanguageIcon />
          </div>
        </div>
      </div>
      <div className="myprofile__body">
        <div className="myprofile__bio">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          nobis nemo maiores ratione assumenda officiis dolores illo quae
          corporis eaque rem autem, ab dolore, delectus illum recusandae culpa
          facere. Quasi? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Deserunt est mollitia unde ipsum iure nobis quo autem, itaque
          commodi aut ex similique quis rerum neque cupiditate sit.
          Perspiciatis, aliquid alias.
        </div>

        <div className="myprofile__cards">
          <div className="myprofile__card">
            15.5k
            <div className="myprofile__card_separator"></div>
            Rooms
          </div>
          <div className="myprofile__card">
            15.5k
            <div className="myprofile__card_separator"></div>
            Rooms
          </div>
        </div>
      </div>

      <div className="myprofile__footer">
        <div className="myprofile__footer__circular">
          <div className="myprofile__footer__circular2">
            <EditIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
