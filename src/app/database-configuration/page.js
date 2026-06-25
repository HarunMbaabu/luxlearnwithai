"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, CheckCircle2, Database, Pencil, PlugZap, Plus, RefreshCw, Trash2, XCircle } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyForm = {
  databaseName: "",
  databaseType: "PostgreSQL",
  host: "",
  port: "5432",
  username: "",
  password: "",
  databaseSchema: "",
};

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  untested: "bg-amber-50 text-amber-700 ring-amber-200",
};

function formatDate(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function DatabaseConfigurationPage() {
  const [configs, setConfigs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(null);

  const stats = useMemo(() => {
    const active = configs.filter((item) => item.connectionStatus === "active").length;
    const failed = configs.filter((item) => item.connectionStatus === "failed").length;
    const recent = configs[0] ? formatDate(configs[0].updatedAt) : "No configurations yet";
    return { total: configs.length, active, failed, recent };
  }, [configs]);

  async function loadConfigurations() {
    setLoading(true);
    try {
      const response = await fetch("/api/database-configurations");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setConfigs(data.configurations || []);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Unable to load configurations." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConfigurations();
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validateForm() {
    const required = ["databaseName", "databaseType", "host", "port", "username", "databaseSchema"];
    const missing = required.filter((field) => !String(form[field]).trim());
    if (!editingId && !form.password.trim()) missing.push("password");
    if (missing.length) return `Please complete required fields: ${missing.join(", ")}.`;
    const port = Number(form.port);
    if (!Number.isInteger(port) || port < 1 || port > 65535) return "Port must be between 1 and 65535.";
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const error = validateForm();
    if (error) return setMessage({ type: "error", text: error });
    setSaving(true);
    try {
      const response = await fetch(editingId ? `/api/database-configurations/${editingId}` : "/api/database-configurations", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage({ type: "success", text: editingId ? "Configuration updated successfully." : "Configuration saved successfully." });
      setForm(emptyForm);
      setEditingId(null);
      await loadConfigurations();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Unable to save configuration." });
    } finally {
      setSaving(false);
    }
  }

  async function testUnsavedConnection() {
    const error = validateForm();
    if (error) return setMessage({ type: "error", text: error });
    setTesting("draft");
    try {
      const response = await fetch("/api/database-configurations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage({ type: "success", text: "Connection test succeeded." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Connection test failed." });
    } finally {
      setTesting(null);
    }
  }

  async function testSavedConnection(id) {
    setTesting(id);
    try {
      const response = await fetch(`/api/database-configurations/${id}/test`, { method: "POST" });
      const data = await response.json();
      if (data.configuration) setConfigs((items) => items.map((item) => (item.id === id ? data.configuration : item)));
      if (!response.ok) throw new Error(data.error);
      setMessage({ type: "success", text: "Saved connection test succeeded." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Saved connection test failed." });
      await loadConfigurations();
    } finally {
      setTesting(null);
    }
  }

  async function deleteConfiguration(id) {
    if (!window.confirm("Delete this database configuration?")) return;
    try {
      const response = await fetch(`/api/database-configurations/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setConfigs((items) => items.filter((item) => item.id !== id));
      setMessage({ type: "success", text: "Configuration deleted." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Unable to delete configuration." });
    }
  }

  function editConfiguration(config) {
    setEditingId(config.id);
    setForm({
      databaseName: config.databaseName,
      databaseType: config.databaseType,
      host: config.host,
      port: String(config.port),
      username: config.username,
      password: "",
      databaseSchema: config.databaseSchema,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header hideRegistrationBanner />
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20"><Database className="h-4 w-4" /> Admin database operations</div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">Database Configuration Dashboard</h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-100">Create, test, monitor, and maintain database connection settings for the LuxDevHQ platform without exposing sensitive passwords.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {message && <div className={`mb-6 rounded-xl border p-4 ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>{message.text}</div>}

        <div className="grid gap-4 md:grid-cols-4">
          {[{ label: "Total databases", value: stats.total, icon: Database }, { label: "Active connections", value: stats.active, icon: CheckCircle2 }, { label: "Failed / inactive", value: stats.failed, icon: XCircle }, { label: "Recently updated", value: stats.recent, icon: Activity }].map((stat) => <Card key={stat.label} className="shadow-sm"><CardContent className="flex items-center gap-4 p-5"><div className="rounded-2xl bg-blue-100 p-3 text-blue-900"><stat.icon className="h-5 w-5" /></div><div><p className="text-sm text-slate-500">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div></CardContent></Card>)}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
          <Card className="shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-blue-900" /> {editingId ? "Update configuration" : "Add configuration"}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label>Database name *</Label><Input value={form.databaseName} onChange={(e) => updateField("databaseName", e.target.value)} placeholder="Production analytics" /></div>
                <div><Label>Database type *</Label><select className="mt-1 h-9 w-full rounded-md border bg-white px-3 text-sm" value={form.databaseType} onChange={(e) => updateField("databaseType", e.target.value)}><option>PostgreSQL</option><option>MySQL</option><option>SQL Server</option><option>Oracle</option></select></div>
                <div className="grid grid-cols-[1fr_110px] gap-3"><div><Label>Host *</Label><Input value={form.host} onChange={(e) => updateField("host", e.target.value)} placeholder="db.example.com" /></div><div><Label>Port *</Label><Input value={form.port} onChange={(e) => updateField("port", e.target.value)} /></div></div>
                <div><Label>Username *</Label><Input value={form.username} onChange={(e) => updateField("username", e.target.value)} /></div>
                <div><Label>Password {editingId ? "(leave blank to keep current)" : "*"}</Label><Input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} autoComplete="new-password" /></div>
                <div><Label>Database / schema name *</Label><Input value={form.databaseSchema} onChange={(e) => updateField("databaseSchema", e.target.value)} placeholder="luxdevhq" /></div>
                <div className="flex flex-col gap-3 sm:flex-row"><Button type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update" : "Save"}</Button><Button type="button" variant="outline" onClick={testUnsavedConnection} disabled={testing === "draft"}><PlugZap className="h-4 w-4" /> {testing === "draft" ? "Testing..." : "Test Connection"}</Button></div>
                {editingId && <Button type="button" variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel editing</Button>}
              </form>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="flex-row items-center justify-between"><CardTitle>Saved configurations</CardTitle><Button variant="outline" size="sm" onClick={loadConfigurations}><RefreshCw className="h-4 w-4" /> Refresh</Button></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Database</th><th className="px-5 py-3">Endpoint</th><th className="px-5 py-3">Credentials</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Dates</th><th className="px-5 py-3">Actions</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? <tr><td className="px-5 py-6" colSpan="6">Loading configurations...</td></tr> : configs.length === 0 ? <tr><td className="px-5 py-8 text-center text-slate-500" colSpan="6">No database configurations have been saved yet.</td></tr> : configs.map((config) => <tr key={config.id} className="align-top"><td className="px-5 py-4"><p className="font-semibold">{config.databaseName}</p><p className="text-slate-500">{config.databaseType} · {config.databaseSchema}</p></td><td className="px-5 py-4"><p>{config.host}</p><p className="text-slate-500">Port {config.port}</p></td><td className="px-5 py-4"><p>{config.username}</p><p className="font-mono text-slate-500">{config.passwordMasked}</p></td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[config.connectionStatus] || statusStyles.untested}`}>{config.connectionStatus}</span>{config.lastError && <p className="mt-2 max-w-xs text-xs text-red-600">{config.lastError}</p>}</td><td className="px-5 py-4 text-xs text-slate-500"><p>Created: {formatDate(config.createdAt)}</p><p>Updated: {formatDate(config.updatedAt)}</p><p>Tested: {formatDate(config.lastTestedAt)}</p></td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => testSavedConnection(config.id)} disabled={testing === config.id}><PlugZap className="h-4 w-4" /> {testing === config.id ? "Testing" : "Test"}</Button><Button size="sm" variant="outline" onClick={() => editConfiguration(config)}><Pencil className="h-4 w-4" /> Edit</Button><Button size="sm" variant="destructive" onClick={() => deleteConfiguration(config.id)}><Trash2 className="h-4 w-4" /> Delete</Button></div></td></tr>)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}
