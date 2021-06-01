/**
 * @fileOverview
 * @name queries.js
 * @author Aniket Narvekar <aniket.narvekar0496@gmail.com>
 * @license
 * @abstract The file contains function that query the database and return the result if present.
 */

const Pool = require('pg').Pool;
const env = require('dotenv');
env.config();
const pool = new Pool();

/**
 * The all pair of relation and symantic relations present in umls.
 * @returns {List} The List of relation pair. 
 */
async function getRelation () {
    const res = await pool.query ('select * from umls.relation');
    return res.rows;
}

/**
 * The concept with relation for specified concept if present.
 * @param {string} cui - The Concept Unique Identifier.
 * @returns {List}  the list of concept with relation.
 */
async function getConceptRelation(cui) {
    const res = await pool.query ('(SELECT a.cui, aui, lat, ts, stt, ispref, a.sab, a.str, tty, code, c.tui, c.sty, rel, rela FROM umls.mrconso AS a, umls.mrrel AS b, umls.mrsty AS c WHERE ((a.cui = b.cui2) and (a.cui = c.cui) and (b.cui1 = $1)))', [cui]);
    return res.rows;
}

module.exports = {
    getRelation: getRelation,
    getConceptRelation: getConceptRelation
};
