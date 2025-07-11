// models/menuItemModel.js

const pool = require("../config/db");

async function getAllMenuItems() {
  try {
    // const result = await pool.query("SELECT * FROM menu_menuitem LIMIT 1");
      const query = `
SELECT id, url, \"order\", is_active, access_level, analytics_data, archived_at, archived_by_id, created_at,
       created_by_id, custom_css, custom_js, deleted_at, deleted_by_id, draft_version, featured_image_url,
       geo_location, icon, is_accessible, is_archived,       is_cacheable, is_deleted, is_draft, is_dropdown,       is_external,       is_featured,       is_featured_image,       is_hidden,
       is_promoted,       is_published,       is_scheduled,       is_searchable,
       is_trending,       is_video,       is_visible,
       parent_menu_id,       published_at,       published_by_id,
       scheduled_at,       scheduled_by_id,       seo_description,
       seo_title,       target,       title,       tool_domain,
       updated_at,       updated_by_id,       video_url
FROM public.menu_menuitem
    WHERE is_deleted = false AND is_visible = true AND is_published = true
    ORDER BY "order" ASC NULLS LAST;
  `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("❌ QUERY ERROR:", err.message);
    throw err;
  }
}

// Fetch all active, visible, published menu items (filter optional)
// async function getAllMenuItems() {
//   const query = `
// SELECT id, url, "order", is_active, access_level, analytics_data, archived_at, archived_by_id, created_at,
//        created_by_id, custom_css, custom_js, deleted_at, deleted_by_id, draft_version, featured_image_url,
//        geo_location, icon, is_accessible, is_archived,       is_cacheable, is_deleted, is_draft, is_dropdown,       is_external,       is_featured,       is_featured_image,       is_hidden,
//        is_promoted,       is_published,       is_scheduled,       is_searchable,
//        is_trending,       is_video,       is_visible,
//        parent_menu_id,       published_at,       published_by_id,
//        scheduled_at,       scheduled_by_id,       seo_description,
//        seo_title,       target,       title,       tool_domain,
//        updated_at,       updated_by_id,       video_url
// FROM public.menu_menuitem
//     WHERE is_deleted = false AND is_visible = true AND is_published = true
//     ORDER BY "order" ASC NULLS LAST;
//   `;

  
//   const result = await pool.query(query);
//   return result.rows;
// }
// async function getAllMenuItems() {
//   const result = await pool.query("SELECT * FROM menu_menuitem LIMIT 1");
//   return result.rows;
// }

module.exports = {
  getAllMenuItems,
};