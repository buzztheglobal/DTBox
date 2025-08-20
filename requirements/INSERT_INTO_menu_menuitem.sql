INSERT INTO public.menu_menuitem (
    id, url, "order", is_active, access_level, analytics_data, archived_at,
    archived_by_id, created_at, created_by_id,
    custom_css, custom_js, deleted_at, deleted_by_id, draft_version,
    featured_image_url, geo_location, icon, is_accessible, is_archived,
    is_cacheable, is_deleted, is_draft, is_dropdown, is_external,
    is_featured, is_featured_image, is_hidden, is_promoted, is_published,
    is_scheduled, is_searchable, is_trending, is_video, is_visible,
    parent_menu_id, published_at, published_by_id, scheduled_at, scheduled_by_id,
    seo_description, seo_title, target, title, tool_domain,
    updated_at, updated_by_id, video_url
)
VALUES (
    36,                             -- id
    '/Stage-Timer',                -- url
    35,                            -- "order"
    TRUE,                          -- is_active
    'public',                      -- access_level
    NULL,                          -- analytics_data
    NULL,                          -- archived_at
    NULL,                          -- archived_by_id
    CURRENT_TIMESTAMP,             -- created_at
    1,                             -- created_by_id
    NULL,                          -- custom_css
    NULL,                          -- custom_js
    NULL,                          -- deleted_at
    NULL,                          -- deleted_by_id
    NULL,                          -- draft_version
    NULL,                          -- featured_image_url
    NULL,                          -- geo_location
    NULL,                          -- icon
    TRUE,                          -- is_accessible
    FALSE,                         -- is_archived
    TRUE,                          -- is_cacheable
    FALSE,                         -- is_deleted
    FALSE,                         -- is_draft
    FALSE,                         -- is_dropdown
    FALSE,                         -- is_external
    FALSE,                         -- is_featured
    TRUE,                          -- is_featured_image
    FALSE,                         -- is_hidden
    FALSE,                         -- is_promoted
    TRUE,                          -- is_published
    FALSE,                         -- is_scheduled
    TRUE,                          -- is_searchable
    FALSE,                         -- is_trending
    FALSE,                         -- is_video
    TRUE,                          -- is_visible
    NULL,                          -- parent_menu_id
    CURRENT_TIMESTAMP,             -- published_at
    1,                             -- published_by_id
    NULL,                          -- scheduled_at
    NULL,                          -- scheduled_by_id
    'Manage event schedules with our Stage Timer tool, featuring QR code access for remote control.', -- seo_description
    'Stage Timer',                 -- seo_title
    '_blank',                      -- target
    'Stage Timer',                 -- title
    'Events',                      -- tool_domain
    CURRENT_TIMESTAMP,             -- updated_at
    1,                             -- updated_by_id
    NULL                           -- video_url
);

update public.menu_menuitem
set seo_description='Grow your savings with Fixed Deposit.'
where id=27;