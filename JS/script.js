

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
});
