import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModalService } from '../../../common/modal.module';

import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { EndUserAgreement } from './eua.model';
import { EuaService } from './eua.service';
import { ManageEuaComponent } from './manage-eua.component';

@UntilDestroy()
@Component({
	selector: 'admin-update-eua',
	templateUrl: './manage-eua.component.html'
})
export class AdminUpdateEuaComponent extends ManageEuaComponent implements OnInit {
	constructor(
		router: Router,
		public modalService: ModalService,
		protected euaService: EuaService,
		protected route: ActivatedRoute
	) {
		super(router, modalService);
	}

	ngOnInit() {
		this.title = 'Edit EUA';
		this.subtitle = "Make changes to the EUA's information";
		this.submitText = 'Save';

		this.route.params.subscribe((params: Params) => {
			this.id = params[`id`];
			this.euaService.get(this.id).subscribe(eua => {
				this.eua = eua;
			});
		});
	}

	submitEua() {
		const _eua = new EndUserAgreement();
		_eua.euaModel = {
			_id: this.eua.euaModel._id,
			title: this.eua.euaModel.title,
			text: this.eua.euaModel.text,
			published: this.eua.euaModel.published
		};
		this.euaService
			.update(_eua)
			.pipe(untilDestroyed(this))
			.subscribe(() => this.router.navigate(['/admin/euas', { clearCachedFilter: true }]));
	}
}
