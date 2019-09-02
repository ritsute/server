/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import './../../legacy/filenameplugin'
import './../../legacy/filesystemtagsplugin'
import './../../legacy/requestremoteaddressplugin'
import './../../legacy/requesttimeplugin'
import './../../legacy/requesturlplugin'
import './../../legacy/requestuseragentplugin'
import './../../legacy/usergroupmembershipplugin'

import FileMimeType from './FileMimeType';
import SizeValue from './SizeValue';

const FileChecks = Object.values(OCA.WorkflowEngine.Plugins).map((plugin) => {
	if (plugin.component) {
		return { ...plugin.getCheck(), component: plugin.component() }
	}
	return plugin.getCheck()
})


// new way of registering checks

const validateRegex = function(string) {
	var regexRegex = /^\/(.*)\/([gui]{0,3})$/
	var result = regexRegex.exec(string)
	return result !== null
}

FileChecks.push({
	class: 'OCA\\WorkflowEngine\\Check\\FileName',
	name: t('workflowengine', 'File name'),
	operators: [
		{ operator: 'is', name: t('workflowengine', 'is') },
		{ operator: '!is', name: t('workflowengine', 'is not') },
		{ operator: 'matches', name: t('workflowengine', 'matches') },
		{ operator: '!matches', name: t('workflowengine', 'does not match') }
	],
	placeholder: (check) => {
		if (check.operator === 'matches' || check.operator === '!matches') {
			return '/^dummy-.+$/i'
		}
		return 'filename.txt'
	},
	validate: (check) => {
		if (check.operator === 'matches' || check.operator === '!matches') {
			return validateRegex(check.value)
		}
		return true
	}
})

FileChecks.push({
	class: 'OCA\\WorkflowEngine\\Check\\FileMimeType',
	name: t('workflowengine', 'File MIME type'),
	operators: [
		{ operator: 'is', name: t('workflowengine', 'is') },
		{ operator: '!is', name: t('workflowengine', 'is not') },
		{ operator: 'matches', name: t('workflowengine', 'matches') },
		{ operator: '!matches', name: t('workflowengine', 'does not match') }
	],
	component: FileMimeType
})

FileChecks.push({
	class: 'OCA\\WorkflowEngine\\Check\\FileSize',
	name: t('workflowengine', 'File size (upload)'),
	operators: [
		{ operator: 'less', name: t('workflowengine', 'less') },
		{ operator: '!greater', name: t('workflowengine', 'less or equals') },
		{ operator: '!less', name: t('workflowengine', 'greater or equals') },
		{ operator: 'greater', name: t('workflowengine', 'greater') }
	],
	component: SizeValue
})

export default FileChecks
