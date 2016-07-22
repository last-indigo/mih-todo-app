'use strict';

class TemplatesController {
	constructor(Authentication, Users, Notification) {
		this.Users = Users;
		this.Authentication = Authentication;
		this.user = Authentication.user;
		this.notification = Notification;
		this.list = this.user.taskTemplates;

		this.sliderOptions = {
			floor: 0,
			ceil: 24
		};
	}

	update(template, index) {
		this.user.taskTemplates[index] = template;

		var updatedUser = new this.Users(this.user);

		updatedUser.$update(updatedUser => {
			this.notification.success(`"Template ${template.title}" was successfully updated`);
			this.user = this.Authentication.user = updatedUser;
		}, err => console.error(err));
	}

	remove(template, index) {
		var updatedUser = new this.Users(this.user);

		updatedUser.taskTemplates.splice(index, 1);

		updatedUser.$update(updatedUser => {
			this.notification.success(`"Template ${template.title}" was successfully removed`);
			this.user = this.Authentication.user = updatedUser;
			this.list = updatedUser.taskTemplates;
		}, err => console.error(err));
	}
}

TemplatesController.$inject = ['Authentication', 'Users', 'Notification'];
angular.module('tasks').controller('TemplatesController', TemplatesController);
