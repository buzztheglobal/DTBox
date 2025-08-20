SELECT id,
       url,
       "order",
       is_active,
       is_accessible,
       is_featured,
       is_hidden,
       is_promoted,
       is_visible
-- SELECT *
FROM public.menu_menuitem
order by id desc
LIMIT 1000;

SELECT count(id)
FROM public.menu_menuitem
where is_visible=TRUE and is_active=TRUE;


SELECT * FROM menu_menuitem WHERE is_deleted = false and is_active=TRUE and is_visible=TRUE order by url, tool_domain;
