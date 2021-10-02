import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">What's Cooking in the Kitchen?</span>
        <span className="headerTitleLg">Le Blog Culinaire</span>
      </div>
      <img className="headerImg" alt="" />
    </div>
  );
}
