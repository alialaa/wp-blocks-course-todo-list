<?php
/**
 * Plugin Name:       To Do List
 * Description:       Display and edit todos in the data store.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ali Alaa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocks-course-todo-list
 *
 * @package           blocks-course
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function blocks_course_todo_list_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'blocks_course_todo_list_block_init' );

function blocks_course_todo_list_set_translations() {
	wp_set_script_translations( 'blocks-course-todo-list-editor-script', 'blocks-course-todo-list', plugin_dir_path( __FILE__ ) . 'languages' );
}

add_action( 'init', 'blocks_course_todo_list_set_translations' );

function blocks_course_load_translations( $mofile, $domain ) {
    if ( 'blocks-course-todo-list' === $domain && false !== strpos( $mofile, WP_LANG_DIR . '/plugins/' ) ) {
        $locale = apply_filters( 'plugin_locale', determine_locale(), $domain );
        $mofile = WP_PLUGIN_DIR . '/' . dirname( plugin_basename( __FILE__ ) ) . '/languages/' . $domain . '-' . $locale . '.mo';
    }
    return $mofile;
}
add_filter( 'load_textdomain_mofile', 'blocks_course_load_translations', 10, 2 );