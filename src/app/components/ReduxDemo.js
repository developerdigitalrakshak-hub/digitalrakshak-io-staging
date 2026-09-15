'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsRequest, clearPosts } from '../../redux/modules/posts/actions/postsActions';
import { loginRequest, logout } from '../../redux/modules/auth/submodules/userLogin/actions/loginActions';
import styles from './ReduxDemo.module.scss';

export default function ReduxDemo() {
  const dispatch = useDispatch();

  // Selectors from top-level module (posts) and sub-module (auth -> userLogin)
  const { items: posts, loading: postsLoading, error: postsError, lastFetchedAt } = useSelector((state) => state.posts);
  const { user, token, isAuthenticated, loading: authLoading, error: authError } = useSelector((state) => state.auth.userLogin);

  const [emailInput, setEmailInput] = useState('developer@company.com');

  const handleFetchPosts = () => {
    dispatch(fetchPostsRequest({ limit: 6, page: 1 }));
  };

  const handleClearPosts = () => {
    dispatch(clearPosts());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email: emailInput }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <section className={styles.reduxContainer}>
      <div className={styles.header}>
        <div>
          <h2>⚡ Modular & Sub-Modular Redux Saga Demo</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Powered by OOP Class API Services (<code>PostsApiService</code> & <code>LoginApiService</code>) invoked inside Sagas.
          </p>
        </div>
        <div className={styles.badgeGroup}>
          <span className={`${styles.badge} ${styles.sagaBadge}`}>⚙️ Redux Saga</span>
          <span className={`${styles.badge} ${styles.persistBadge}`}>💾 Redux Persist</span>
          <span className={`${styles.badge} ${styles.classBadge}`}>🏛️ Class API Service</span>
        </div>
      </div>

      {/* Grid containing Module 1 & Sub-module 2 */}
      <div className={styles.demoGrid}>
        
        {/* SUB-MODULE: Auth -> UserLogin */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleCardHeader}>
            <h3>🔐 Sub-Module: <code>auth/submodules/userLogin</code></h3>
            <span className={styles.submoduleBadge}>Sub-Module</span>
          </div>
          <p className={styles.moduleDesc}>
            Uses <code>new LoginApiService()</code> class instance inside Saga to perform server authentication.
          </p>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className={styles.formGroup}>
              <input
                type="email"
                className={styles.inputField}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email..."
                required
              />
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>🔑 Login via Sub-Module Saga</span>
                )}
              </button>
            </form>
          ) : (
            <div className={styles.userInfoBox}>
              <div className={styles.avatar}>👤</div>
              <div>
                <h4 style={{ margin: 0, color: '#f1f5f9' }}>{user?.name}</h4>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>{user?.email} • {user?.role}</p>
                <code style={{ fontSize: '0.75rem', color: '#a78bfa', display: 'block', marginTop: '4px' }}>
                  JWT: {token?.substring(0, 24)}...
                </code>
              </div>
              <button className={styles.btnDangerSmall} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {authError && (
            <div className={styles.errorMessage} style={{ marginTop: '1rem' }}>
              ⚠️ {authError}
            </div>
          )}
        </div>

        {/* MODULE 1: Posts */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleCardHeader}>
            <h3>📦 Top Module: <code>posts</code></h3>
            <span className={styles.topmoduleBadge}>Top Module</span>
          </div>
          <p className={styles.moduleDesc}>
            Uses <code>PostsApiService</code> class instance to fetch fake posts from API via Redux Saga.
          </p>

          <div className={styles.controls}>
            <button
              className={styles.btnPrimary}
              onClick={handleFetchPosts}
              disabled={postsLoading}
            >
              {postsLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Fetching...</span>
                </>
              ) : (
                <span>🚀 Fetch Posts via Class API</span>
              )}
            </button>

            <button
              className={styles.btnDanger}
              onClick={handleClearPosts}
              disabled={postsLoading || posts.length === 0}
            >
              Clear Posts
            </button>
          </div>

          {lastFetchedAt && (
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem' }}>
              Last fetched: {new Date(lastFetchedAt).toLocaleTimeString()}
            </p>
          )}

          {postsError && (
            <div className={styles.errorMessage}>
              ⚠️ {postsError}
            </div>
          )}
        </div>

      </div>

      {/* Posts Showcase Grid */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#e2e8f0' }}>
            Persisted State Showcase ({posts.length} Items)
          </h4>
          <button className={styles.btnOutlineSmall} onClick={handleReload}>
            🔄 Refresh Page (Test Persist)
          </button>
        </div>

        {posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <span className={styles.postId}>Post #{post.id}</span>
                <h5 className={styles.postTitle}>{post.title}</h5>
                <p className={styles.postBody}>{post.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.icon}>📭</div>
            <p>No posts loaded in Redux state yet.</p>
            <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
              Click <strong>"Fetch Posts via Class API"</strong> to test class service execution in Saga.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
