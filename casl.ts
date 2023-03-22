import { AbilityBuilder, createMongoAbility } from '@casl/ability';

interface IUser {
	id: number;
	role: 'admin' | 'vip' | 'normal';
}

class Work {
	constructor(attrs) {
		Object.assign(this, attrs);
	}
}

const adminUser: IUser = { id: 1, role: 'admin' };
const vipUser: IUser = { id: 2, role: 'vip' };
const normalUser: IUser = { id: 3, role: 'normal' };

const normalWork = new Work({ id: 2, author: 3, isTemplate: false });
const vipWork = new Work({ id: 1, author: 2, isTemplate: true });

function defineWorkRules () {
	const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
	can('read', 'Work')
	cannot('delete', 'Work')
	can('update', 'Work', { isTemplate: false })
	return build()
}

const workRules = defineWorkRules();
console.log(workRules.can('read', normalWork)); // true
console.log(workRules.cannot('delete', normalWork)); // true
console.log(workRules.can('update', normalWork)); // true
console.log(workRules.can('update', vipWork)); // false

function defineUserRules (user: IUser) {
	const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
	if (user.role === 'admin') {
		// admin 可以操作任何资源
		can('manage', 'all');
	} else if (user.role === 'vip') {
		can('download', 'Work');
	}
	if (user.role === 'normal' || user.role === 'vip') {
		can('read', 'Work');
		can('delete', 'Work', { author: user.id });
		can('update', 'Work', { author: user.id });
	}
	return build();
}

// admin role
console.log('---------- admin role -----------')
const adminRole = defineUserRules(adminUser);
console.log(adminRole.can('download', 'Work'));
console.log(adminRole.can('delete', 'Work'));
console.log(adminRole.can('update', vipWork));
console.log(adminRole.can('update', normalWork));

// vip role
console.log('---------- vip role -----------')
const vipRole = defineUserRules(vipUser);
console.log(vipRole.can('download', 'Work'));
console.log(vipRole.can('delete', 'Work'));
console.log(vipRole.can('update', vipWork));
console.log(vipRole.can('update', normalWork));

// normal role
console.log('---------- normal role -----------')
const normalRole = defineUserRules(normalUser);
console.log(normalRole.can('download', 'Work'));
console.log(normalRole.can('delete', 'Work'));
console.log(normalRole.can('update', vipWork));
console.log(normalRole.can('update', normalWork));
