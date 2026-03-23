

function renderJobCards(jobs) {
	const container = document.querySelector('.job-cards');
	if (!container) return;
	container.innerHTML = jobs.map(job => `
		<div class="job-card">
			<div class="job-card-header">
				<h3 class="job-title">${job.title}</h3>
				<span class="job-company">${job.company}</span>
			</div>
			<div class="job-card-body">
				<span class="job-location">${job.location}</span>
				<div class="job-meta">
					<span class="job-level">${job.level}</span>
					<span class="job-eligibility">Eligibility: ${job.eligibility}</span>
				</div>
                <div class="job-description">${job.description ? job.description : ''}</div>
				<div class="job-badges">
					${job.accessible ? '<span class="job-badge accessible">Accessible</span>' : ''}
					${job.remote ? '<span class="job-badge remote">Remote</span>' : ''}
					${job.flexible ? '<span class="job-badge flexible">Flexible</span>' : ''}
				</div>
			</div>
			<a class="btn-primary job-apply" href="${job.link}" target="_blank">View/Apply</a>
		</div>
	`).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof jobs !== 'undefined') {
    renderJobCards(jobs);
  }

	// Filtering logic
	const form = document.querySelector('.contact-form');
	const eligibilityCheckboxes = form.querySelectorAll('input[name="eligibility"]');
	const accessibilityCheckboxes = form.querySelectorAll('input[name="accessibility"]');

	function getSelectedValues(checkboxes) {
		return Array.from(checkboxes)
			.filter(cb => cb.checked)
			.map(cb => cb.value);
	}

	function filterJobs() {
		const selectedEligibility = getSelectedValues(eligibilityCheckboxes);
		const selectedAccessibility = getSelectedValues(accessibilityCheckboxes);
		const selectedRole = form.querySelector('select[name="role"]').value;
		const selectedLocation = form.querySelector('select[name="Location"]').value;

		let filtered = jobs.filter(job => {
			// Eligibility filter
			let eligibilityMatch = true;
			if (selectedEligibility.length > 0) {
				eligibilityMatch = selectedEligibility.some(sel => {
					if (sel === 'All') return true;
					if (sel === 'PR/Citizen') return job.eligibility === 'PR/Citizen';
					if (sel === 'International') return job.eligibility === 'International' || job.eligibility === 'All';
					return false;
				});
			}

			// Accessibility filter
			let accessibilityMatch = true;
			if (selectedAccessibility.length > 0) {
				accessibilityMatch = selectedAccessibility.every(sel => {
					if (sel === 'accessible') return job.accessible;
					if (sel === 'flexible') return job.flexible;
					if (sel === 'mental') return job.description && job.description.toLowerCase().includes('mental');
					return false;
				});
			}

			// Role filter (by job title)
			let roleMatch = true;
			if (selectedRole) {
				roleMatch = job.title.toLowerCase().includes(selectedRole.toLowerCase());
			}

			// Location filter
			let locationMatch = true;
			if (selectedLocation) {
				if (selectedLocation === 'Remote') {
					locationMatch = job.location.toLowerCase().includes('remote');
				} else if (selectedLocation === 'Onsite') {
					locationMatch = !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid');
				} else if (selectedLocation === 'Hybrid') {
					locationMatch = job.location.toLowerCase().includes('hybrid');
				}
			}

			return eligibilityMatch && accessibilityMatch && roleMatch && locationMatch;
		});
		renderJobCards(filtered);
	}

	eligibilityCheckboxes.forEach(cb => cb.addEventListener('change', filterJobs));
	accessibilityCheckboxes.forEach(cb => cb.addEventListener('change', filterJobs));

	// Optionally, filter on form submit as well
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		filterJobs();
	});

	// Add event listeners for role and location dropdowns
	form.querySelector('select[name="role"]').addEventListener('change', filterJobs);
	form.querySelector('select[name="Location"]').addEventListener('change', filterJobs);
});
