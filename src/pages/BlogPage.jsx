import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../App.css";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading posts:", error);
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img
              src="/image/Map_Pin_Grub.png"
              style={{
                width: "18px",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
              alt=""
            />
            Life_Journal.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav>
            <Link to="/">
              <img src="/image/home.png" className="nav-icon" alt="" />{" "}
              <span>Home</span>
            </Link>
            <Link to="/blog">
              <img src="/image/life.png" className="nav-icon" alt="" />{" "}
              <span>Life Blog</span>
            </Link>
            <Link to="/projects">
              <img src="/image/made.png" className="nav-icon" alt="" />{" "}
              <span>Stuff I Made</span>
            </Link>
            <Link to="/portfolio">
              <img src="/image/me.png" className="nav-icon" alt="" />{" "}
              <span>Who Am I</span>
            </Link>
            <Link to="/view-gallery">
              <img src="/image/frame.png" className="nav-icon" alt="" />{" "}
              <span>Gallery</span>
            </Link>
            <Link to="/games">
              <img src="/image/joystick.png" className="nav-icon" alt="" />{" "}
              <span>Games</span>
            </Link>
            <Link to="/chat">
              <img src="/image/babble.png" className="nav-icon" alt="" />{" "}
              <span>Chat</span>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 20px",
            width: "100%",
          }}
        >
          <section style={{ width: "100%", maxWidth: "1100px" }}>
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>Journal_History.db</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>
            <div className="windowContent">
              <h1
                style={{
                  marginBottom: "20px",
                  fontSize: "2rem",
                  color: "#03274B",
                }}
              >
                📓 Darshan's Life Logs
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "30px",
                  opacity: 0.8,
                }}
              >
                A collection of thoughts, experiences, and random musings from
                my journey.
              </p>

              {isLoading ? (
                <p
                  style={{ textAlign: "center", padding: "40px", opacity: 0.6 }}
                >
                  Loading logs...
                </p>
              ) : posts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "#cfd3da",
                    border: "2px solid #000",
                    borderRadius: "5px",
                  }}
                >
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                    No entries yet
                  </h2>
                  <p style={{ opacity: 0.7 }}>Check back soon for new posts!</p>
                </div>
              ) : (
                posts.map((post, index) => {
                  const date = new Date(post.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  );
                  return (
                    <div
                      key={post.id}
                      className="post"
                      style={{
                        marginBottom: "30px",
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards`,
                        maxHeight: "none",
                      }}
                    >
                      <div
                        style={{
                          borderBottom: "2px solid #000",
                          marginBottom: "15px",
                          paddingBottom: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "0.85rem",
                              opacity: 0.6,
                              display: "block",
                              marginBottom: "5px",
                            }}
                          >
                            📅 {date}
                          </span>
                          <h2
                            style={{
                              margin: "5px 0",
                              fontSize: "1.6rem",
                              color: "#03274B",
                            }}
                          >
                            &gt; {post.title}
                          </h2>
                        </div>
                        {post.mood && (
                          <span
                            style={{
                              padding: "5px 15px",
                              background: "#50B6D1",
                              border: "2px solid #000",
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Mood: {post.mood}
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          whiteSpace: "pre-wrap",
                          fontSize: "1.1rem",
                          lineHeight: "1.6",
                          color: "#333",
                        }}
                      >
                        {post.content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </main>

      <footer
        style={{ textAlign: "center", padding: "40px", marginTop: "20px" }}
      >
        <p style={{ color: "#565f89", fontSize: "0.9rem" }}>
          📖 Reading through {posts.length} life log
          {posts.length !== 1 ? "s" : ""}
        </p>
      </footer>
    </div>
  );
}

export default BlogPage;
